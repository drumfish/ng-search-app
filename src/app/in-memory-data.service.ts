import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Search } from './search';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const searchList = [
      { id: 11, title: 'Mr. Nice',  desc: 'lorem ipsum dolor v lorem ipsum dolor' },
      { id: 12, title: 'Narco',     desc: 'Narco  ipsum dolor v lorem  ipsum dolor' },
      { id: 13, title: 'Bombasto',  desc: 'Narco ipsum dolor v lorem ipsum dolor' },
      { id: 14, title: 'Celeritas', desc: 'lorem  ipsum dolor v lorem  ipsum dolor' },
      { id: 15, title: 'Magneta',   desc: 'lorem  ipsum dolor v lorem  ipsum dolor' },
      { id: 16, title: 'RubberMan', desc: 'lorem  ipsum dolor v lorem  ipsum dolor' },
      { id: 17, title: 'Dynama',    desc: 'lorem ipsum dolor v lorem ipsum dolor' },
      { id: 18, title: 'Dr IQ',     desc: 'lorem  ipsum dolor v lorem  ipsum dolor' },
      { id: 19, title: 'Magma',     desc: 'lorem  ipsum dolor v lorem  ipsum dolor' },
      { id: 20, title: 'Tornado',   desc: 'lorem ipsum dolor v lorem ipsum dolor' }
    ];
    return {searchList};
  }
}
