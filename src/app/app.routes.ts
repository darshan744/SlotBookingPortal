import {  Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { UserComponent } from './Pages/Student-Pages/user/user.component';
import { AdminComponent } from './Pages/Admin-Pages/admin/admin.component';
import { DashboardComponent } from './Pages/Student-Pages/dashboard/dashboard.component';
import { AdminHomeComponent } from './Pages/Admin-Pages/admin-home/admin-home.component';
import { SuperadminComponent } from './Pages/Super-Admin-Pages/superadmin/superadmin.component';
import { Dashboard } from './Pages/Super-Admin-Pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { authGuard } from './Services/Guards/auth.guard';
import { LoadingComponent } from './Components/loading/loading.component';
export const routes: Routes = [

    {
        path:"NotAUser",
        component:PageNotFoundComponent,
    },
    {
      path:"loading",
      component:LoadingComponent
    }
,
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
            {path:'Create',loadComponent:()=>import('./Pages/Super-Admin-Pages/create/create.component').then(e=>e.CreateComponent)},
            {path:'slot-generation',loadComponent:()=>import('./Pages/Super-Admin-Pages/slot-generation/slot-generation.component').then(e=>e.SlotGenerationComponent)},
            {path :'settings',loadComponent:()=>import('./Pages/Super-Admin-Pages/settings/settings.component').then(e=>e.SettingsComponent)},
            {path :'status',loadComponent:()=>import('./Pages/Super-Admin-Pages/status-tab/status-tab.component').then(e=>e.StatusTabComponent)},
            {path:'slot',loadComponent:()=>import('./Pages/Super-Admin-Pages/slot-generation/slot-generation.component').then(e=>e.SlotGenerationComponent)},
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
            {path:"Events/:eventType" ,loadComponent:()=>import('./Pages/Student-Pages/event-booking/event-booking.component').then(e=>e.EventBookingComponent)},
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
            {path:'Events',loadComponent:()=>import('./Pages/Admin-Pages/admin-events/admin-events.component').then(e=>e.AdminEventsComponent)},
            {path:'studentSearch',loadComponent:()=>import('./Pages/Admin-Pages/admin-student-search/admin-student-search.component').then(e=>e.AdminStudentSearchComponent)},
            {path:"**",redirectTo:'Home'}
        ]
    }
];
