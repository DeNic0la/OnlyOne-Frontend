import { async, TestBed } from '@angular/core/testing';
import { CardHolderComponent } from './card-holder.component';
import { MessageService } from 'primeng/api';

describe('CardHolderComponent', () => {
  let component: CardHolderComponent;
  let msgService: MessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ MessageService, CardHolderComponent ]
    })
      .compileComponents();

    component = TestBed.inject(CardHolderComponent);
    msgService = TestBed.inject(MessageService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading to false by default', () => {
    expect(component.isLoading).toBeFalse();
  });

  it('should set isYourTurn to false by default', () => {
    expect(component.isYourTurn).toBeFalse();
  });

  it('should set index to -3 by default', () => {
    expect(component.index).toEqual(-3);
  });

  it('should set cards to an empty array by default', () => {
    expect(component.cards).toEqual([]);
  });

  it('should call the warning method in the message service when onCardClick is called and isLoading is true', () => {
    spyOn(msgService, 'add').and.callThrough();

    component.isLoading = true;
    component.isYourTurn = true;
    component.onCardClick(0);

    expect(msgService.add).toHaveBeenCalled();
  });

  it('should call the warning method in the message service when onCardClick is called and isYourTurn is false', () => {
    spyOn(msgService, 'add').and.callThrough();

    component.isLoading = false;
    component.isYourTurn = false;
    component.onCardClick(0);

    expect(msgService.add).toHaveBeenCalled();
  });

  it('should emit the index passed to onCardClick when isLoading is false and isYourTurn is true', () => {
    spyOn(component.playCard, 'emit').and.callThrough();

    component.isLoading = false;
    component.isYourTurn = true;
    component.onCardClick(0);

    expect(component.playCard.emit).toHaveBeenCalledWith(0);
  });

  it('should return an object with the correct CSS classes when itemClass is called', () => {
    component.index = 2;
    expect(component.itemClass(2)).toEqual({
      'le-card': true,
      'over-next': false,
      'next': false,
      'selected': true
    });

    expect(component.itemClass(1)).toEqual({
      'le-card': true,
      'over-next': false,
      'next': true,
      'selected': false
    });

    expect(component.itemClass(0)).toEqual({
      'le-card': true,
      'over-next': true,
      'next': false,
      'selected': false
    });
  });

  it('should return an object with the correct CSS classes when itemClass is called with negative indices', () => {
    component.index = -2;
    expect(component.itemClass(-2)).toEqual({
      'le-card': true,
      'over-next': false,
      'next': false,
      'selected': true
    });

    expect(component.itemClass(-1)).toEqual({
      'le-card': true,
      'over-next': false,
      'next': true,
      'selected': false
    });

    expect(component.itemClass(-3)).toEqual({
      'le-card': true,
      'over-next': false,
      'next': true,
      'selected': false
    });
  });

});
