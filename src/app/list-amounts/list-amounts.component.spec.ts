import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAmountsComponent } from './list-amounts.component';

describe('ListAmountsComponent', () => {
  let component: ListAmountsComponent;
  let fixture: ComponentFixture<ListAmountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAmountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAmountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
