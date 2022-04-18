import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductAPIService } from '../service/product-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'price',
    'freshness',
    'comment',
    'Action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private product: ProductAPIService, private router: Router, 
    private route:ActivatedRoute) {}

  openDialog() {
    const dialogRef = this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'save') {
          this.getAllProduct();
        }
      });
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.route.snapshot.data.productgetall)
    this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    // console.log("asdasdas",test);
    
    // this.getAllProduct();
  }

  getAllProduct() {
    // this.product.getProduct().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.dataSource = new MatTableDataSource(res);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   },
    //   error: (err) => {
    //     alert('Something went wrong!');
    //   },
    // });
  }

  editProduct(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val == 'update') {
          this.getAllProduct();
        }
      });
  }

  deleteProduct(_id: any) {
    this.product.deleteProduct(_id).subscribe({
      next: (res) => {
        alert('Product Deleted Successfully');
        this.getAllProduct()
      },
      error: (err) => {
        alert('Something Went Wrong');
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  logout(){
    localStorage.clear()
    this.router.navigateByUrl("login")
  }
}
