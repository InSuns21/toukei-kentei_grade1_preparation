export type Role = 'viewer' | 'editor' | 'admin';
export type Action = 'read' | 'update' | 'delete';
export type Abstract = { role: Role; action: Action; sameTenant: boolean; isOwner: boolean; authenticated: boolean };
export type Principal = { id: string; tenant: string; role: string };
export type Project = { id: string; tenant: string; owner: string };
export type Raw = { method: unknown; projectId: unknown; session: unknown };
export type Mutation = 'tenant' | 'owner' | 'role' | 'patch' | 'internal';
const routes = new Map<string, Action>([['GET','read'],['PATCH','update'],['DELETE','delete']]);
const roles = new Set<string>(['viewer','editor','admin']);
const isId = (v: unknown): v is string => typeof v === 'string' && /^[A-Za-z0-9-]+$/.test(v);
export function authorize(r: Abstract, mutation?: Mutation): boolean {
  if (!r.authenticated || (!r.sameTenant && mutation !== 'tenant')) return false;
  if (r.role === 'admin' || r.action === 'read') return true;
  return r.role === 'editor' && r.action === 'update' && (mutation === 'owner' ? r.sameTenant : r.isOwner);
}
export function dispatch(raw: Raw, sessions: ReadonlyMap<string, Principal>, projects: ReadonlyMap<string, Project>, mutation?: Mutation) {
  const events = ['raw'];
  const result = () => ({ allowed: events.includes('effect'), events });
  const effect = () => { events.push('effect'); };
  const guardedEffect = (r: Abstract) => { if (authorize(r, mutation)) effect(); };
  // The internal mutation represents exposing a direct service call.
  if (mutation === 'internal') { effect(); return result(); }
  const action = typeof raw.method === 'string' ? routes.get(raw.method) : undefined;
  if (!action || !isId(raw.projectId) || !isId(raw.session)) return result();
  const project = projects.get(raw.projectId);
  if (!project || !isId(project.id) || !isId(project.tenant) || !isId(project.owner) || project.id !== raw.projectId) return result();
  events.push('normalized');
  const principal = sessions.get(raw.session);
  if (!principal || !isId(principal.id) || !isId(principal.tenant)) return result();
  if (!roles.has(principal.role) && mutation !== 'role') return result();
  const role = roles.has(principal.role) ? principal.role as Role : 'admin';
  events.push('authenticated');
  const r: Abstract = {role, action, sameTenant: principal.tenant === project.tenant, isOwner: principal.id === project.owner, authenticated: true};
  // Fault injection only: normal dispatch has no route-specific bypass.
  if (mutation === 'patch' && action === 'update') { effect(); return result(); }
  if (!authorize(r, mutation)) return result();
  events.push('checked');
  guardedEffect(r);
  return result();
}
