import { Routes } from '@angular/router';
import { ByCapitalPage } from './pages/by-capital-page/by-capital-page';
import { CountryLayout } from './layouts/countryLayout/countryLayout';
import { ByRegionPages } from './pages/by-region-pages/by-region-pages';
import { ByCountryPages } from './pages/by-country-pages/by-country-pages';
import { CountryPage } from './pages/country-page/country-page';

export const countryRoutes: Routes = [
    {
        path: '',
        component: CountryLayout,
        children: [
            {
                path: 'by-capital',
                component: ByCapitalPage
            },
            {
                path: 'by-region',
                component: ByRegionPages
            },
            {
                path: 'by-country',
                component: ByCountryPages
            },
            {
                path: 'by/:code',
                component: CountryPage
            },
              {
                path:'**',
              redirectTo:'by-capital'
                  }
        ]
    },
    // {
    //     path: 'country',

    // },

];

export default countryRoutes;
