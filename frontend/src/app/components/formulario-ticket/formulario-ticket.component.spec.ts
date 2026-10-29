import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTicketComponent } from './formulario-ticket.component';

describe('FormularioTicketComponent', () => {
  let component: FormularioTicketComponent;
  let fixture: ComponentFixture<FormularioTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
