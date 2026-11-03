import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'drone/:id', loadComponent: () => import('./pages/drone-detail/drone-detail.component').then(m => m.DroneDetailComponent) },
  { path: 'drone', loadComponent: () => import('./pages/drone/drone.component').then(m => m.DroneComponent) },
  {
    path: 'mission/create',
    loadComponent: () =>
      import('./pages/mission/mission-create/mission-create.component')
        .then(m => m.MissionCreateComponent)
  },
  { path: 'mission/:id', loadComponent: () => import('./pages/mission-detail/mission-detail.component').then(m => m.MissionDetailComponent) },
 {
  path: 'mission/:id/waypoint/create',
  loadComponent: () =>
    import('./pages/waypoint-create/waypoint-create.component')
      .then(m => m.WaypointCreateComponent)
},
  { path: 'mission', loadComponent: () => import('./pages/mission/mission.component').then(m => m.MissionComponent) },
  {
    path: 'mission/edit/:id',
    loadComponent: () =>
      import('./pages/mission/mission-edit/mission-edit.component')
        .then(m => m.MissionEditComponent)
  },
   {
    path: 'waypoint/edit/:id',
    loadComponent: () =>
      import('./pages/waypoint/waypoint-edit/waypoint-edit.component')
        .then(m => m.WaypointEditComponent)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

