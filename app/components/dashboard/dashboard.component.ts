import { Component } from 'angular2/core';
import { HeroService } from './../../services/hero.service';
import {OnInit} from "angular2/core";
import {Hero} from "./../../classes/hero";
import {Router} from "angular2/router";

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    constructor(
        private _router: Router,
        private _heroService: HeroService) {
    }
    ngOnInit() {
        this._heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1,5));
    }
    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', { id: hero.id }];
        this._router.navigate(link);
    }
}
