import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DeviceQuestionsComponent } from './pages/device-questions/device-questions.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'mobiles', component: CatalogComponent,},
      { path: 'tablets', component: CatalogComponent },
      { path: 'wearables', component: CatalogComponent },
      { path: 'hearables', component: CatalogComponent },
      { path: 'consoles', component: CatalogComponent },
      { path: 'laptops', component: CatalogComponent },
      { path: 'how-it-works', component: HowItWorksComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'checkout', component: OrderPageComponent },
      { path: 'device-questions', component: DeviceQuestionsComponent },
    ]
  }
]

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })

// export class AppRoutingModule {}
