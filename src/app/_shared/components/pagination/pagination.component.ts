import { Component, OnInit, Input, Output } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit {
  pages: number[] = [];

  @Input() totalPages: number;
  @Input() currentPage: number;

  @Output() currentPageChange = new Subject<number>();

  ngOnInit() {
    this.calcPages();
  }

  calcPages() {
    this.pages = [];
    switch (this.currentPage) {
      case 1:
        this.pages.push(this.currentPage);
        this.pages.push(this.currentPage + 1);
        this.pages.push(this.currentPage + 2);
        break;
      case this.totalPages:
        this.pages.push(this.totalPages - 2);
        this.pages.push(this.totalPages - 1);
        this.pages.push(this.totalPages);
        break;
      default:
        this.pages.push(this.currentPage - 1);
        this.pages.push(this.currentPage);
        this.pages.push(this.currentPage + 1);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.calcPages();
    this.currentPageChange.next(page);
  }

  navigateToFirst() {
    this.currentPage = 1;
    this.calcPages();
    this.currentPageChange.next(1);
  }

  navigateToLast() {
    this.currentPage = this.totalPages;
    this.calcPages();
    this.currentPageChange.next(this.totalPages);
  }
}
