import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ListPaginate } from '../types/base';

export interface ExampleData {
  id: string;
  name: string;
  email: string;
  status: boolean;
  createdAt: Date;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExampleDataService {
  private mockData: ExampleData[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: true,
      createdAt: new Date('2023-01-15'),
      category: 'Premium',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: false,
      createdAt: new Date('2023-02-20'),
      category: 'Standard',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: true,
      createdAt: new Date('2023-03-10'),
      category: 'Premium',
    },
    {
      id: '4',
      name: 'Alice Williams',
      email: 'alice@example.com',
      status: true,
      createdAt: new Date('2023-04-05'),
      category: 'Basic',
    },
    {
      id: '5',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      status: false,
      createdAt: new Date('2023-05-12'),
      category: 'Standard',
    },
    {
      id: '6',
      name: 'David Miller',
      email: 'david@example.com',
      status: true,
      createdAt: new Date('2023-06-18'),
      category: 'Premium',
    },
    {
      id: '7',
      name: 'Emily Davis',
      email: 'emily@example.com',
      status: false,
      createdAt: new Date('2023-07-23'),
      category: 'Standard',
    },
    {
      id: '8',
      name: 'Frank Wilson',
      email: 'frank@example.com',
      status: true,
      createdAt: new Date('2023-08-05'),
      category: 'Basic',
    },
    {
      id: '9',
      name: 'Grace Taylor',
      email: 'grace@example.com',
      status: true,
      createdAt: new Date('2023-09-12'),
      category: 'Premium',
    },
    {
      id: '10',
      name: 'Henry Martinez',
      email: 'henry@example.com',
      status: false,
      createdAt: new Date('2023-10-08'),
      category: 'Standard',
    },
    {
      id: '11',
      name: 'Isabella Lopez',
      email: 'isabella@example.com',
      status: true,
      createdAt: new Date('2023-11-19'),
      category: 'Basic',
    },
    {
      id: '12',
      name: 'Jack Anderson',
      email: 'jack@example.com',
      status: false,
      createdAt: new Date('2023-12-22'),
      category: 'Premium',
    },
    {
      id: '13',
      name: 'Karen Thomas',
      email: 'karen@example.com',
      status: true,
      createdAt: new Date('2024-01-03'),
      category: 'Standard',
    },
    {
      id: '14',
      name: 'Leo Garcia',
      email: 'leo@example.com',
      status: true,
      createdAt: new Date('2024-01-15'),
      category: 'Basic',
    },
    {
      id: '15',
      name: 'Mia Rodriguez',
      email: 'mia@example.com',
      status: false,
      createdAt: new Date('2024-01-28'),
      category: 'Premium',
    },
    {
      id: '16',
      name: 'Nathan Lee',
      email: 'nathan@example.com',
      status: true,
      createdAt: new Date('2024-02-04'),
      category: 'Standard',
    },
    {
      id: '17',
      name: 'Olivia Clark',
      email: 'olivia@example.com',
      status: false,
      createdAt: new Date('2024-02-17'),
      category: 'Basic',
    },
    {
      id: '18',
      name: 'Peter Wright',
      email: 'peter@example.com',
      status: true,
      createdAt: new Date('2024-02-29'),
      category: 'Premium',
    },
    {
      id: '19',
      name: 'Quinn Adams',
      email: 'quinn@example.com',
      status: true,
      createdAt: new Date('2024-03-10'),
      category: 'Standard',
    },
    {
      id: '20',
      name: 'Rachel Scott',
      email: 'rachel@example.com',
      status: false,
      createdAt: new Date('2024-03-22'),
      category: 'Basic',
    },
    {
      id: '21',
      name: 'Steve King',
      email: 'steve@example.com',
      status: true,
      createdAt: new Date('2024-04-05'),
      category: 'Premium',
    },
    {
      id: '22',
      name: 'Tina Hill',
      email: 'tina@example.com',
      status: false,
      createdAt: new Date('2024-04-18'),
      category: 'Standard',
    },
    {
      id: '23',
      name: 'Ulysses Green',
      email: 'ulysses@example.com',
      status: true,
      createdAt: new Date('2024-05-01'),
      category: 'Basic',
    },
    {
      id: '24',
      name: 'Victoria Baker',
      email: 'victoria@example.com',
      status: false,
      createdAt: new Date('2024-05-14'),
      category: 'Premium',
    },
    {
      id: '25',
      name: 'William Carter',
      email: 'william@example.com',
      status: true,
      createdAt: new Date('2024-05-27'),
      category: 'Standard',
    },
    {
      id: '26',
      name: 'Xena Mitchell',
      email: 'Xena@example.com',
      status: false,
      createdAt: new Date('2024-06-10'),
      category: 'Basic',
    },
  ];

  getByPaged(params: any): Observable<ListPaginate<ExampleData>> {
    let filteredData = [...this.mockData];

    // Apply filters
    if (params.name) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(params.name.toLowerCase())
      );
    }

    if (params.category) {
      filteredData = filteredData.filter(
        (item) => item.category === params.category
      );
    }

    if (params.status !== undefined && params.status !== null) {
      filteredData = filteredData.filter(
        (item) => item.status === params.status
      );
    }

    // Apply sorting
    if (params.sorting) {
      const [field, direction] = params.sorting.split(' ');
      filteredData.sort((a: any, b: any) => {
        if (direction === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    }

    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const result: ListPaginate<ExampleData> = {
      data: paginatedData,
      total_records: filteredData.length,
      page: page,
      limit: limit,
      total_pages: Math.ceil(filteredData.length / limit),
    };

    // Simulate API delay
    return of(result).pipe(delay(500));
  }

  toggleStatus(id: string): Observable<void> {
    const item = this.mockData.find((d) => d.id === id);
    if (item) {
      item.status = !item.status;
    }
    return of(void 0).pipe(delay(300));
  }

  delete(id: string): Observable<void> {
    const index = this.mockData.findIndex((d) => d.id === id);
    if (index > -1) {
      this.mockData.splice(index, 1);
    }
    return of(void 0).pipe(delay(300));
  }
}
