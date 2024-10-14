import {  Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './User/user/user.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { DashboardComponent } from './User/dashboard/dashboard.component';
import { HeaderComponent } from './User/header/header.component';
import { MiComponent } from './User/EventComponents/mi/mi.component';
import { SiComponent } from './User/EventComponents/si/si.component';
import { GDComponent } from './User/EventComponents/gd/gd.component';
import { AdminEventsComponent } from './Admin/admin-events/admin-events.component';
import { AdminStudentSearchComponent } from './Admin/admin-student-search/admin-student-search.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { SuperadminComponent } from './SuperAdmin/superadmin/superadmin.component';
import { SearchComponent } from './SuperAdmin/search/search.component';
import { CreateComponent } from './SuperAdmin/create/create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './Services/Guards/auth.guard';


export const routes: Routes = [
    
    {
        path:"NotAUser",
        component:PageNotFoundComponent,
    },

   //Login Component
    {
        path:'',
        component:LoginComponent,
        
    },
    //SuperAdmin
    {
        path:'superAdmin',
        component:SuperadminComponent
        ,children:[
            {path:'Search',component:SearchComponent},
            {path:'Create',component:CreateComponent}
        ]
    },
    //User
    {
        path:'user',
        canActivate :[authGuard],
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
    //Admin
    {
        path:'admin/:id',
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
    }
];
