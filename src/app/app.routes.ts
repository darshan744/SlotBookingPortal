import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { MiComponent } from './mi/mi.component';
import { SiComponent } from './si/si.component';
import { GDComponent } from './gd/gd.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
        
    },
    {
        path:'user',
        component:UserComponent,
        children:[
            {path:'dashboard',component:DashboardComponent},
            {
                path:'header',
                component:HeaderComponent
            },
            {
                path:'Si',component:SiComponent
            },
            {
                path:'Mi',component:MiComponent
            },
            {
                path:'Gd',component:GDComponent
            }
        ]
        
    },
    {
        path:'admin',
        component:AdminComponent
    },
    
   
];
