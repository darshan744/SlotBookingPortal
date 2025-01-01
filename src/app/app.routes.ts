import {  Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './User/user/user.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { DashboardComponent } from './User/dashboard/dashboard.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { SuperadminComponent } from './SuperAdmin/superadmin/superadmin.component';
import { Dashboard } from './SuperAdmin/dashboard/dashboard.component';
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
        component:SuperadminComponent,
        data:{role:"SuperAdmin"},
        canActivate:[authGuard],
        children:[
            {path:'Search',component:Dashboard},
            {path:'Create',loadComponent:()=>import('./SuperAdmin/create/create.component').then(e=>e.CreateComponent)},
            {path:'slot-generation',loadComponent:()=>import('./SuperAdmin/slot-generation/slot-generation.component').then(e=>e.SlotGenerationComponent)},
            {path :'settings',loadComponent:()=>import('./SuperAdmin/settings/settings.component').then(e=>e.SettingsComponent)},
            {path :'status',loadComponent:()=>import('./SuperAdmin/status-tab/status-tab.component').then(e=>e.StatusTabComponent)},
            {path:'slot',loadComponent:()=>import('./SuperAdmin/slot-generation/slot-generation.component').then(e=>e.SlotGenerationComponent)},
            {path:'**',redirectTo:'Search'}
        ]
    },
    //User
    {
        path:'user',
        data:{role:"Student"},
        canActivate :[authGuard],
        component:UserComponent,
        children:[
            {path:'dashboard',component:DashboardComponent},
            {path:"Events/:eventType" ,loadComponent:()=>import('./User/event-booking/event-booking.component').then(e=>e.EventBookingComponent)},
            {path:"**" ,redirectTo:'dashboard'}
        ]

    },
    //Admin
    {
        path:'admin',
        data:{role:"Staff"},
        canActivate:[authGuard],
        component:AdminComponent,
        children:[
            {path:'Home',component:AdminHomeComponent},
            {path:'Events',loadComponent:()=>import('./Admin/admin-events/admin-events.component').then(e=>e.AdminEventsComponent)},
            {path:'studentSearch',loadComponent:()=>import('./Admin/admin-student-search/admin-student-search.component').then(e=>e.AdminStudentSearchComponent)},
            {path:"**",redirectTo:'Home'}
        ]
    }
];
