import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationLinks } from './models/pagination-links';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  paginationLink: PaginationLinks[];
  @Input() currentPageIndex: number;
  @Input() numberOfPages: number;
  @Output() onPageClickEvent = new EventEmitter();

  constructor() { 
  }

  ngOnInit(): void {
    // this.paginationLink = [];
    // this.createPage();
  }

  ngOnChanges(change: any): void {
    this.paginationLink = [];
    this.createPage();
  }

  createPage() {
      this.paginationLink.push(this.getPaginationLinkObject(0, "Previous", false, this.currentPageIndex > 1? true : false));
      for(var i = this.currentPageIndex - 2; i <= this.currentPageIndex+2; i++) {
        if(i>=1 && i<=this.numberOfPages) {
          this.paginationLink.push(this.getPaginationLinkObject(i, i.toString(), i==this.currentPageIndex, true));
        }
      }
      this.paginationLink.push(this.getPaginationLinkObject(0, "Next", false, this.currentPageIndex < this.numberOfPages ? true : false));
  }

  onPageClick(link) {
    if(link.text=='Previous') {
      this.onPageClickEvent.emit(this.currentPageIndex-1);
    } else if(link.text=='Next') {
      this.onPageClickEvent.emit(this.currentPageIndex+1);
    } else {
      this.onPageClickEvent.emit(link.index);
    }
    
  }

  private getPaginationLinkObject(idx: number, text: string, isActive: boolean, isEnabled: boolean) {
    let paginationLink: PaginationLinks = {
      index: idx,
      text: text,
      isActive: isActive,
      isEnabled: isEnabled
    };

    return paginationLink;
  }

}
