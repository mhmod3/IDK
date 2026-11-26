import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  SOLUTION_TAB_1,
  SOLUTION_TAB_2,
  SOLUTION_TAB_3,
} from '../src/lib/equations';

describe('Pedagogical Derivations & Step Verifications', () => {
  it('should verify Tab 1 model structure and calculations (Building Height)', () => {
    assert.equal(SOLUTION_TAB_1.steps.length, 3, 'Tab 1 must have 3 structured steps');
    assert.match(SOLUTION_TAB_1.steps[0].general, /Δy = v_i · t \+ ½ · g · t²/);
    assert.match(SOLUTION_TAB_1.steps[1].result, /−45 m/);
    assert.match(SOLUTION_TAB_1.steps[2].result, /\+45 m/);
    assert.equal(SOLUTION_TAB_1.resolvedValue, 'H = +45 m');
  });

  it('should verify Tab 2 model structure and calculations (Impact Velocity)', () => {
    assert.equal(SOLUTION_TAB_2.steps.length, 3, 'Tab 2 must have 3 structured steps');
    assert.match(SOLUTION_TAB_2.steps[0].general, /v_f = v_i \+ g · t/);
    assert.match(SOLUTION_TAB_2.steps[1].result, /−30 m\/s/);
    assert.match(SOLUTION_TAB_2.steps[2].result, /30 m\/s/);
    assert.equal(SOLUTION_TAB_2.resolvedValue, 'v_f = −30 m/s');
  });

  it('should verify Tab 3 model structure and calculations (State after 1s - Issue #5 fix)', () => {
    assert.equal(SOLUTION_TAB_3.steps.length, 4, 'Tab 3 must have 4 complete steps so all results are shown');

    // Step 1: Velocity at 1s
    assert.match(SOLUTION_TAB_3.steps[0].title, /الفرع \(أ\)/);
    assert.match(SOLUTION_TAB_3.steps[0].result, /−10 m\/s/);

    // Step 2: Displacement at 1s
    assert.match(SOLUTION_TAB_3.steps[1].title, /الفرع \(ب\)/);
    assert.match(SOLUTION_TAB_3.steps[1].result, /−5 m/);

    // Step 3: Height above ground at 1s
    assert.match(SOLUTION_TAB_3.steps[2].title, /الفرع \(ج\)/);
    assert.match(SOLUTION_TAB_3.steps[2].result, /\+40 m/);

    // Step 4: Summary containing all 3 results
    assert.match(SOLUTION_TAB_3.steps[3].result, /v_f = −10 m\/s  ,  h = 40 m/);

    assert.equal(SOLUTION_TAB_3.resolvedValue, 'v_f = −10 m/s , h = 40 m');
  });

  it('should verify pedagogical elements (givens, law choice reason, coordinate system note)', () => {
    [SOLUTION_TAB_1, SOLUTION_TAB_2, SOLUTION_TAB_3].forEach((tab) => {
      assert.ok(tab.targetDescription.length > 0, 'Target description must be non-empty');
      assert.ok(tab.givens.length >= 3, 'Givens must list at least 3 items');
      assert.ok(tab.lawChoiceReason.length > 10, 'Law choice reason must be articulated');
      assert.ok(tab.coordinateNote.length > 10, 'Coordinate system explanation must be present');
    });
  });
});
