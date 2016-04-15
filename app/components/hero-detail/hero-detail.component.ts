import {Component, Input} from 'angular2/core';
import {Hero} from './../../classes/hero';
import {OnInit} from "angular2/core";
import {HeroService} from "./../../services/hero.service";
import {RouteParams} from "angular2/router";
@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls:  ['app/hero-detail.component.css']
})
/*
 1. Naming conventions - case sensitivity(대소문자 구별)
 파일이름에는 lower dash case (AKA "kebab-case")
 class명에는 camel 표기법
 2. @Input decorator
 */
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;

    constructor(
        private _heroService: HeroService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        let id = +this._routeParams.get('id');
        this._heroService.getHero(id)
            .then(hero => this.hero = hero);
    }

    goBack() {
        window.history.back();
    }
}
