import {Component} from 'angular2/core';
import {Hero} from './../../classes/hero';
import {HeroDetailComponent} from './../hero-detail/hero-detail.component';
import {HeroService} from './../../services/hero.service';
import {OnInit} from "angular2/core";
import {Router} from "angular2/router";
/*
1. double curly braces = 보여주기 위한 단방향 데이터 바인딩
2. back-ticks를 활용한 Multi-line template strings
3. ngModel - 양방향 데이터 바인딩
4. When we assign styles to a component they are scoped to that specific component. Our styles will only apply to our AppComponent and won't "leak" to the outer HTML.
5. built-in directives ngIf and ngFor - structural directives
 */

@Component({
    selector: 'my-heroes',
    template:`
  <h1>{{title}}</h1>
  <h2>My Heroes</h2>
  <ul class="heroes">
    <li *ngFor="#hero of heroes"
      [class.selected]="hero === selectedHero"
      (click)="onSelect(hero)">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </li>
  </ul>
  <div *ngIf="selectedHero">
  <h2>
    {{selectedHero.name | uppercase}} is my hero
  </h2>
  <button (click)="gotoDetail()">View Details</button>
</div>
`,
    styles:[`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
    directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit{
    heroes: Hero[];
    selectedHero: Hero;
    constructor(
        private _router: Router,
        private _heroService: HeroService) { }
    getHeroes() {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    ngOnInit() {
        this.getHeroes();
    }
    onSelect(hero: Hero) { this.selectedHero = hero; }
    gotoDetail() {
        this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }
}

/*
 We did not have to define the heroes type. TypeScript can infer it from the HEROES array.
 */

//var HEROES: Hero[] = [
//    { "id": 11, "name": "Mr. Nice" },
//    { "id": 12, "name": "Narco" },
//    { "id": 13, "name": "Bombasto" },
//    { "id": 14, "name": "Celeritas" },
//    { "id": 15, "name": "Magneta" },
//    { "id": 16, "name": "RubberMan" },
//    { "id": 17, "name": "Dynama" },
//    { "id": 18, "name": "Dr IQ" },
//    { "id": 19, "name": "Magma" },
//    { "id": 20, "name": "Tornado" }
//];


/*
 Do we new the HeroService?  heroService = new HeroService(); // don't do this

 Our component has to know how to create a HeroService. If we ever change the HeroService constructor,
 we'll have to find every place we create the service and fix it. Running around patching code is error prone and adds to the test burden.

 We create a new service each time we use "new". What if the service should cache heroes and share that cache with others? We couldn't do that.

 We're locking the AppComponent into a specific implementation of the HeroService.
 It will be hard to switch implementations for different scenarios.
 Can we operate offline? Will we need different mocked versions under test? Not easy.

 */
