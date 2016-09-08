// JavaScript Document

var correctCards =0;
$( init );
function init() {
	
	//hide the success message
	$('#successMessage')
		.hide()
		.css( {
			left: '580px',
			top: '250px',
			width: 0,
			height: 0
	} );
	
	//Reset the game
	correctCards = 0;
	$('#cardPile').html( '' );
	$('#cardSlots') .html( '' );
	
	//create the pile of shuffled cards
	var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
	
	
	/*['belgium', 'brazil', 'canada', 'denmark', 'france', 'germany', 'italy', 'japan', 'netherlands', 'norway', 'russia', 'spain', 'sweden', 'swiss', 'uk', 'us'];*/
	
	numbers.sort( function() { return Math.random() -.5});	

	
	// For loop that creates the draggable cards
	for (var i=0; i<16; i++ ) {
		$('<div>' + numbers[i] + '</div>')
			.data( 'number', numbers[i] )
			.attr( 'id', 'card' +numbers[i] )
			.appendTo('#cardPile')
			.draggable( {
				containment: '#content',
				stack: '#cardPile div',
				cursor: 'move',
				revert: true
		});
	}
	
	//Create the card slots
	var words = ['Belgium', 'Brazil', 'Canada', 'Denmark', 'France', 'Germany', 'Italy', 'Japan', 'Netherlands', 'Norway', 'Russia', 'Spain', 'Sweden', 'Switzerland', 'United Kingdom', 'United States'];
	
	for ( var i=1; i<=16; i++ ) {
		$('<div>' + words[i-1] + '</div>')
			.data( 'number', i )
			.appendTo( '#cardSlots')
			.droppable( {
				accept: 'div#cardPile div',
				hoverClass: 'hovered',
				drop: handleCardDrop
			});
	}
}

function handleCardDrop( event, ui ) {
	var slotNumber = $(this).data( 'number' );
	var cardNumber = ui.draggable.data( 'number');
	
	/* if the card was dropped to the correct slot, 
	change the card color, position it directly on top of the slot,
	and prevent it being dragged again */
	
	if (slotNumber == cardNumber) {
		ui.draggable.addClass( 'correct' );
		ui.draggable.draggable( 'disable' );
		$(this).droppable( 'disable' );
		
		//snaps correct card to position of correct droppable
		ui.draggable.position( { of: $(this), my: 'left top', at: 'left top'} );
		
		// Prevents dropped card from going back to it's home 
		ui.draggable.draggable( 'option', 'revert', false );
		
		// increments correct Cards by 1
		correctCards++;
	}
	
	/* if all the cards have been placed correctly then display a message and reset the cards */
	
	if (correctCards == 16) {
		$('#successMessage')
			.show()
			.animate( {
				left: '380px',
				top: '200px',
				width: '400px',
				height: '150px',
				opacity: 1
			} );
			
	}
	
	
}


	