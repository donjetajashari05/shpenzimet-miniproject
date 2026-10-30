import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ShtoShpenzim } from './shto-shpenzim';

describe('ShtoShpenzim', () => {
  let component: ShtoShpenzim;
  let fixture: ComponentFixture<ShtoShpenzim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShtoShpenzim],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShtoShpenzim);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});