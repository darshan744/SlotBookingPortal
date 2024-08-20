import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

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
            }
        ]
        
    },
    {
        path:'admin',
        component:AdminComponent
    },
    
   
];
