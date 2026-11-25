import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fc from 'fast-check';
import { authorize, dispatch } from './api.ts';
import type { Abstract, Action, Role, Principal, Project, Mutation } from './api.ts';

const roles: Role[] = ['viewer','editor','admin'];
const actions: Action[] = ['read','update','delete'];
const bits = [false,true];
const methods = {read:'GET',update:'PATCH',delete:'DELETE'};
function oracle(args: string[]) {
  const out = spawnSync('./.lake/build/bin/lvtTenantOracle', args, {encoding:'utf8'});
  assert.ifError(out.error);
  assert.equal(out.status,0,out.stderr);
  assert.equal(out.stderr,'');
  assert.match(out.stdout,/^[01]\r?\n$/);
  return out.stdout.trim() === '1';
}
const b = (x:boolean) => x ? '1' : '0';
function fixture(r: Abstract, user='u1', tenant='t1') {
  const principal: Principal = {id:user,tenant,role:r.role};
  const project: Project = {id:'p1',tenant:r.sameTenant ? tenant : tenant+'-other',owner:r.isOwner ? user : user+'-other'};
  const sessions = new Map<string,Principal>(r.authenticated ? [['s1',principal]] : []);
  const projects = new Map<string,Project>([['p1',project]]);
  const raw = {method:methods[r.action],projectId:'p1',session:'s1'};
  return {raw,sessions,projects};
}
function check(r: Abstract, user?:string, tenant?:string) {
  const expected = oracle([r.role,r.action,b(r.sameTenant),b(r.isOwner),b(r.authenticated)]);
  assert.equal(authorize(r),expected);
  const {raw,sessions,projects}=fixture(r,user,tenant);
  const seen=dispatch(raw,sessions,projects);
  assert.equal(seen.allowed,expected);
  assert.deepEqual(seen.events, !r.authenticated ? ['raw','normalized'] : expected ?
    ['raw','normalized','authenticated','checked','effect'] : ['raw','normalized','authenticated']);
  return expected;
}
let total=0, permits=0;
for(const role of roles) for(const action of actions) for(const sameTenant of bits) for(const isOwner of bits) for(const authenticated of bits) {
  total++; if(check({role,action,sameTenant,isOwner,authenticated})) permits++;
}
assert.equal(total,72); assert.equal(permits,11);
for(const args of [[],['unknown','read','1','1','1'],['admin','unknown','1','1','1'],['admin','read','x','1','1']]) assert.equal(oracle(args),false);
const base: Abstract={role:'admin',action:'read',sameTenant:true,isOwner:true,authenticated:true};
const setup=fixture(base);
for(const raw of [{...setup.raw,method:'POST'},{...setup.raw,projectId:'?'},{...setup.raw,projectId:'absent'},{...setup.raw,session:'absent'}])
  assert.equal(dispatch(raw,setup.sessions,setup.projects).allowed,false);
const unknown=new Map<string,Principal>([['s1',{id:'u1',tenant:'t1',role:'unknown'}]]);
assert.equal(dispatch(setup.raw,unknown,setup.projects).allowed,false);
assert.equal(dispatch(setup.raw,unknown,setup.projects,'role').allowed,true);
for(const [mutation,r] of [
  ['tenant',{...base,sameTenant:false}],
  ['owner',{...base,role:'editor',action:'update',isOwner:false}],
  ['patch',{...base,role:'viewer',action:'update'}],
  ['internal',{...base,sameTenant:false}]
] as [Mutation,Abstract][]) {
  const {raw,sessions,projects}=fixture(r);
  assert.equal(dispatch(raw,sessions,projects).allowed,false);
  const seen=dispatch(raw,sessions,projects,mutation);
  assert.equal(seen.allowed,true,mutation);
  if(mutation==='patch'||mutation==='internal') assert.equal(seen.events.includes('checked'),false);
  console.log('detected mutation',mutation,seen.events);
}
console.log('detected mutation role');
const id = fc.stringOf(fc.constantFrom(...'abc123-'),{minLength:1,maxLength:12});
fc.assert(fc.property(fc.constantFrom(...roles),fc.constantFrom(...actions),fc.boolean(),fc.boolean(),fc.boolean(),id,id,
  (role,action,sameTenant,isOwner,authenticated,user,tenant)=>{check({role,action,sameTenant,isOwner,authenticated},user,tenant);}),
  {seed:20261125,numRuns:100});
fc.assert(fc.property(id,fc.constantFrom('POST','HEAD','UNKNOWN'),(projectId,method)=>{
  assert.equal(dispatch({method,projectId,session:'s1'},setup.sessions,setup.projects).allowed,false);
  assert.equal(dispatch({...setup.raw,projectId:projectId+'?'},setup.sessions,setup.projects).allowed,false);
  const forged={...setup.raw,role:'admin',tenant:'t1',owner:'u1'};
  const denied=fixture({...base,sameTenant:false});
  assert.equal(dispatch(forged,denied.sessions,denied.projects).allowed,false);
}),{seed:20261125,numRuns:100});
console.log('72 abstract requests, 11 permits; all route observations and 5 mutations checked; seed 20261125');
