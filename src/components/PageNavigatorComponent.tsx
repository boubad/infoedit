import * as React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { BaseComponent } from "./BaseComponent";
//
export interface IPageNavigatorProps {
  currentPage: number;
  displayPages: number;
  pagesCount: number;
  busy: boolean;
  gotoPage?: (page: number) => void;
} // interface IPageNavigatorProps
interface IPageNavigatorState {
  startPage: number;
  lastPage: number;
  pagesArray: number[];
}
//
export class PageNavigatorComponent extends BaseComponent<
  IPageNavigatorProps,
  IPageNavigatorState
> {
  constructor(props?: any) {
    super(props);
    this.state = {
      lastPage: 1,
      pagesArray: [],
      startPage: 1
    };
    this.onNextClicked = this.onNextClicked.bind(this);
    this.onPrevClicked = this.onPrevClicked.bind(this);
  } // constructor
  public componentWillReceiveProps(nextProps: IPageNavigatorProps) {
    let page = this.props.currentPage;
    if (nextProps.currentPage !== this.props.currentPage) {
       page = nextProps.currentPage;
    } 
    let nd = this.props.displayPages;
    if (nextProps.displayPages !== this.props.displayPages) {
      nd = nextProps.displayPages;
    }
    let count = this.props.pagesCount;
    if (nextProps.pagesCount !== this.props.pagesCount) {
       count = nextProps.pagesCount;
    }
    this.myUpdateState(page,nd,count);
  } // componentWillReceiveProps
  public componentWillMount() {
    this.setState({
      lastPage: this.props.pagesCount,
      pagesArray: [],
      startPage: 1
    });
    this.myUpdateState(this.props.currentPage,this.props.displayPages,this.props.pagesCount);
  } // componentWillMount

  public render(): React.ReactNode {
    if (this.props.pagesCount < 2) {
      return null;
    }
    return (
      <Pagination>
        {this.renderPrev()}
        {this.state.pagesArray.map(xx => {
          return this.renderItem(xx);
        })}
        {this.renderNext()}
      </Pagination>
    );
  } // render
  private myUpdateState(page:number,nd:number,count:number): void {
    const nbPages = this.props.pagesCount;
    if (nbPages < 2) {
      return;
    }
    let start = this.state.startPage;
    let last = this.state.lastPage;
    if (page < start){
       last = page;
       start = last - nd + 1;
       if (start < 1){
         start = 1;
         last = nd;
         if (last > nbPages){
           last = nbPages;
         }
       }
    }
    if (page > last) {
      start = page;
      last = start + nd  - 1;
      if (last > nbPages){
        last = nbPages;
        start = last - nd + 1;
        if (start < 1){
          start = 1;
        }
      }
    }
    const pagesArray: number[] = [];
    for (let i = start; i <= last; i++) {
      pagesArray.push(i);
    } // i
    this.setState({
      lastPage:last,
      pagesArray,
      startPage: start
    });
  } // myUpdateState
  private renderPrev(): React.ReactNode {
    return (
      <PaginationItem disabled={this.props.currentPage === 1 || this.props.busy}>
        <PaginationLink previous={true} href="#" onClick={this.onPrevClicked} />
      </PaginationItem>
    );
  } // renderPrev
  private renderNext(): React.ReactNode {
    return (
      <PaginationItem
        disabled={
          this.props.currentPage === this.props.pagesCount || this.props.busy
        }
      >
        <PaginationLink next={true} href="#" onClick={this.onNextClicked} />
      </PaginationItem>
    );
  } // renderNext
  private renderItem(p: number): React.ReactNode {
    return (
      <PaginationItem
        key={"" + p}
        active={this.props.currentPage === p}
        disabled={this.props.busy}
      >
        <PaginationLink href="#" onClick={this.onPageClicked.bind(this, p)}>
          {p}
        </PaginationLink>
      </PaginationItem>
    );
  } // renderItem
  private onPageClicked(nPage: number, e?: any) {
    if (this.props.gotoPage) {
      this.props.gotoPage(nPage);
    }
  } // onPageClicked
  private onPrevClicked(e: any) {
    if (this.props.gotoPage) {
      this.props.gotoPage(this.props.currentPage - 1);
    }
  } // onPrevClicked
  private onNextClicked(e: any) {
    if (this.props.gotoPage) {
      this.props.gotoPage(this.props.currentPage + 1);
    }
  } // onNextClicked
} // class PageNavigatorComponent
