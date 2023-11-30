import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'master',
    pathMatch: 'full'
  },
  {
    path: 'master',
    loadChildren: () => import('./modules/master/master.module').then(m => m.MasterModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./modules/setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'purchase',
    loadChildren: () => import('./modules/purchase/purchase.module').then(m => m.PurchaseModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }