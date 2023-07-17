import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './showcase/components/home/home.component';

const routes: Routes = [
  {
    path:'admin',
    component:LayoutComponent,
    children:[
      {path:'',component:DashboardComponent},
      {
        path: 'products',
        loadChildren: () =>
        import('./admin/components/products/products.module').then(
          (module) => module.ProductsModule
        ),
      }
    ]
  },
  {path:'',component:HomeComponent},
  {
    path: 'baskets',
    loadChildren: () =>
      import('./showcase/components/baskets/baskets.module').then(
        (module) => module.BasketsModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./showcase/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
