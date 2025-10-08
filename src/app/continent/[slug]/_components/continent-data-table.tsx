"use client";

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ExternalLink } from 'lucide-react';
import type { CountryData } from '@/lib/data';

type SortableKeys = keyof CountryData;

export function ContinentDataTable({ data }: { data: CountryData[] }) {
  const [filter, setFilter] = React.useState('');
  const [sortConfig, setSortConfig] = React.useState<{
    key: SortableKeys;
    direction: 'ascending' | 'descending';
  } | null>({ key: 'country', direction: 'ascending' });

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortableKeys) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground/50" />;
    }
    if (sortConfig.direction === 'ascending') {
      return <span className="ml-2">▲</span>;
    }
    return <span className="ml-2">▼</span>;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Country-Specific Data</CardTitle>
        <CardDescription>
          Filter and sort trade agreements, customs, and logistics information.
        </CardDescription>
        <div className="mt-4">
          <Input
            placeholder="Filter countries..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm bg-background/50"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" onClick={() => requestSort('country')}>
                    Country
                    {getSortIndicator('country')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => requestSort('tradeAgreement')}
                  >
                    Trade Agreement
                    {getSortIndicator('tradeAgreement')}
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Customs Info
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  Logistical Info
                </TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.country}</TableCell>
                    <TableCell>{item.tradeAgreement}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {item.customsInfo}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {item.logisticalInfo}
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={item.detailsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
