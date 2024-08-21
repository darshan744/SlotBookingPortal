import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { MiComponent } from './mi/mi.component';
import { SiComponent } from './si/si.component';
import { GDComponent } from './gd/gd.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminStudentSearchComponent } from './admin-student-search/admin-student-search.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SuperadminComponent } from './superadmin/superadmin.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
        
    },
    {
        path:'superAdmin',
        component:SuperadminComponent
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
        component:AdminComponent,
        children:[
            {
                path:'Home',component:AdminHomeComponent
            },
            {
                path:'Events',component:AdminEventsComponent
            },
            {
                path:'studentSearch',component:AdminStudentSearchComponent
            }
        ]
    },
    
   
];
