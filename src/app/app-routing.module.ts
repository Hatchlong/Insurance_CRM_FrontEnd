import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo:'authr',
    pathMatch: 'full'
  },
  {
    path: 'authr',
    loadChildren: () => import('./modules/authr/authr.module').then(m => m.AuthrModule)
  },
  {
    path:'master',
    loadChildren:()=>import('./modules/master/master.module').then(m=>m.MasterModule)
  },{
    path:'setting',
    loadChildren:()=>import('./modules/setting/setting.module').then(m=>m.SettingModule)
  },{
    path:'applyPolicy',
    loadChildren:()=>import('./modules/apply-policy/apply-policy.module').then(m=>m.ApplyPolicyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
