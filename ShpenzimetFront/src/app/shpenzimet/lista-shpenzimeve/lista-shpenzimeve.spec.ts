import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaShpenzimeve } from './lista-shpenzimeve';

describe('ListaShpenzimeve', () => {
  let component: ListaShpenzimeve;
  let fixture: ComponentFixture<ListaShpenzimeve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaShpenzimeve],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaShpenzimeve);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
