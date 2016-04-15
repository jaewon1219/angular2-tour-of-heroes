import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HeroService }     from './../services/hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";

@Component({
    selector: 'my-app',
    template: `
     <h1>{{title}}</h1>
     <nav>
        <a [routerLink]="['Dashboard']">Dashboard</a>
        <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
        `,

    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HeroService
    ]
})

@RouteConfig([
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/heroes',
        name: 'Heroes',    //path과 혼동을 피하기 위해서 대문자로 시작한다.
        component: HeroesComponent
    }
])

export class AppComponent {
    title = 'Tour of Heroes';
}


/*
 Notice that we also removed the HeroesComponent from the directives array. AppComponent no longer shows heroes; that will be the router's job.
 We'll soon remove <my-heroes> from the template too.
 */