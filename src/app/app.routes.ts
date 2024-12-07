import { EventBookingComponent } from './User/event-booking/event-booking.component';
import {  Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './User/user/user.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { DashboardComponent } from './User/dashboard/dashboard.component';
import { AdminEventsComponent } from './Admin/admin-events/admin-events.component';
import { AdminStudentSearchComponent } from './Admin/admin-student-search/admin-student-search.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { SuperadminComponent } from './SuperAdmin/superadmin/superadmin.component';
import { Dashboard } from './SuperAdmin/dashboard/dashboard.component';
import { CreateComponent } from './SuperAdmin/create/create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './Services/Guards/auth.guard';
import { SlotGenerationComponent } from './SuperAdmin/slot-generation/slot-generation.component';
import { SettingsComponent } from './SuperAdmin/settings/settings.component';
import { StatusTabComponent } from './SuperAdmin/status-tab/status-tab.component';


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
            {path:'Create',component:CreateComponent},
            {path:'slot-generation',component:SlotGenerationComponent},
            {path : 'settings',component:SettingsComponent},
            {path : 'status',component:StatusTabComponent},
            {path:'slot',component:SlotGenerationComponent},
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
            {path:"Events/:eventType" ,component:EventBookingComponent}

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
            {path:'Events',component:AdminEventsComponent},
            {path:'studentSearch',component:AdminStudentSearchComponent}
        ]
    }
];
