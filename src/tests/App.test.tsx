// Imports
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';

// To Test
import App from '../App';

// Tests
describe('Battle start', () => {
  it('Opponent starts at full health', () => {
    render(<App />);

    const opponentLife = screen.getByText(/🧡/i); // substring match, ignore case

    expect(opponentLife.textContent).toBe('🧡100');
  });

  it('Attack decreases opponent health by 5', () => {
    render(<App />);
    const opponentLife = screen.getByText(/🧡/i);
    const attackButton = screen.getByRole('button', { name: /^attack$/i }); // full string match, ignore case

    expect(opponentLife.textContent).toBe('🧡100');

    user.click(attackButton);

    expect(opponentLife.textContent).toBe('🧡95');
  });

  it('Heavy Attack decreases opponent health by 10', () => {
    render(<App />);
    const opponentLife = screen.getByText(/🧡/i);
    const heavyAttackButton = screen.getByRole('button', { name: /^heavy attack$/i }); 

    expect(opponentLife.textContent).toBe('🧡100');

    user.click(heavyAttackButton);

    expect(opponentLife.textContent).toBe('🧡90');
  });

  it('Magic Attack decreases opponent health by 7.5', () => {
    render(<App />);
    const opponentLife = screen.getByText(/🧡/i);
    const magicAttackButton = screen.getByRole('button', { name: /^magic attack$/i }); 

    expect(opponentLife.textContent).toBe('🧡100');

    user.click(magicAttackButton);

    expect(opponentLife.textContent).toBe('🧡92.5');
  });
});

describe('Battle restart', () => {
    it('Reset button clear opponent health', () => {
      render(<App />);
      const opponentLife = screen.getByText(/🧡/i);
      const heavyAttackButton = screen.getByRole('button', { name: /^heavy attack$/i });
      const resetButton = screen.getByRole('button', { name: /^reset$/i }); 

      user.click(heavyAttackButton);
      expect(opponentLife.textContent).toBe('🧡90')
      
      user.click(resetButton);

      expect(opponentLife.textContent).toBe('🧡100')
    });

    it('Automatic reset after defeating opponent clear opponent health', async () => {
      render(<App />);
      const opponentLife = screen.getByText(/🧡/i);
      const heavyAttackButton = screen.getByRole('button', { name: /^heavy attack$/i });

      for (let attacks = 0; attacks < 10; attacks++) {
        user.click(heavyAttackButton);
      }
      expect(opponentLife.textContent).toBe('🧡0')
      
      await wait(3000)
      expect(opponentLife.textContent).toBe('🧡100')
    });
});




// test('Renders main page correctly', async () => {
//   // Setup
//   render(<App />);
//   const buttonCount = await screen.findByRole('button');
//   const codeCount = screen.queryByText(/The count is now:/);

//   // Pre Expecations
//   expect(buttonCount.innerHTML).toBe('count is: 0');
//   // Instead of:
//   // expect(codeCount).toBeNull();
//   expect(codeCount).not.toBeInTheDocument();

//   // Init
//   user.click(buttonCount);
//   user.click(buttonCount);

//   // Post Expectations
//   expect(buttonCount.innerHTML).toBe('count is: 2');
//   expect(screen.queryByText(/The count is now:/)).toBeInTheDocument();
// });

