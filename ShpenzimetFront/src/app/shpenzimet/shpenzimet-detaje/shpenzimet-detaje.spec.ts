import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ShpenzimetDetaje } from './shpenzimet-detaje';

describe('ShpenzimetDetaje', () => {
  let component: ShpenzimetDetaje;
  let fixture: ComponentFixture<ShpenzimetDetaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShpenzimetDetaje],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShpenzimetDetaje);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});