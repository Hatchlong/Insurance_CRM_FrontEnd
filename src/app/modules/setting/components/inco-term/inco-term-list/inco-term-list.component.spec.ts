import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncoTermListComponent } from './inco-term-list.component';

describe('IncoTermListComponent', () => {
  let component: IncoTermListComponent;
  let fixture: ComponentFixture<IncoTermListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncoTermListComponent]
    });
    fixture = TestBed.createComponent(IncoTermListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
