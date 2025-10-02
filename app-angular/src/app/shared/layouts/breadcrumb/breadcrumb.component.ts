import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { distinctUntilChanged, filter, Subscription } from 'rxjs';

import { BreadCrumb } from '@shared/types/breadCrumb';

import { dynamicBreadCrumb } from '../../constants/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: false,
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs$: Subscription | undefined;

  breadcrumbs: BreadCrumb[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.breadcrumbs$ = this.router.events
      .pipe(
        filter(event => {
          return (
            event instanceof NavigationEnd ||
            (event instanceof Scroll && event?.routerEvent instanceof NavigationEnd)
          );
        }),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this._buildBreadCrumb(this.activatedRoute.root);
      });
  }

  ngOnDestroy(): void {
    this.breadcrumbs$?.unsubscribe();
  }

  private _buildBreadCrumb(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: BreadCrumb[] = []
  ): BreadCrumb[] {
    let label = route.routeConfig?.data ? route.routeConfig.data['title'] : '';

    let path = route.routeConfig?.data ? route.routeConfig.path : '';

    const lastRoutePart = path?.split('/').pop() ?? '';

    const isDynamicRoute = lastRoutePart?.startsWith(':') ?? '';

    if (isDynamicRoute && !!route?.routeConfig?.data?.['dynamic']) {
      const paramName = lastRoutePart?.split(':')[1];
      path = path?.replace(lastRoutePart, route.snapshot.params[paramName]);
      label =
        dynamicBreadCrumb[route.snapshot.params[paramName] as keyof typeof dynamicBreadCrumb] ??
        route.snapshot.params[paramName];
    }

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: BreadCrumb = {
      label: label,
      url: nextUrl,
    };

    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this._buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
