import { Routes } from '@angular/router';
import { ByCapitalPage } from './pages/by-capital-page/by-capital-page';
import { CountryLayout } from './countryLayout/countryLayout';

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
