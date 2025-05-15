import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonViewDialogComponent } from './person-view-dialog.component';

describe('PersonViewDialogComponent', () => {
  let component: PersonViewDialogComponent;
  let fixture: ComponentFixture<PersonViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
