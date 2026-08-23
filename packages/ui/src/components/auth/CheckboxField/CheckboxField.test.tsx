import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CheckboxField } from './CheckboxField';

describe('CheckboxField', () => {
  it('renders native checkbox input with accessible id and label association', () => {
    const html = renderToString(
      <CheckboxField id="terms-cb">
        I agree to the <a href="/terms">Terms</a>
      </CheckboxField>
    );
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('id="terms-cb"');
    expect(html).toContain('for="terms-cb"');
    expect(html).toContain('href="/terms"');
    expect(html).toContain('I agree to the');
  });

  it('reflects checked state when checked is true', () => {
    const html = renderToString(<CheckboxField checked={true} ariaLabel="Accept terms" />);
    expect(html).toContain('checked=""');
    expect(html).toContain('aria-label="Accept terms"');
  });

  it('reflects disabled state', () => {
    const html = renderToString(<CheckboxField disabled={true} />);
    expect(html).toContain('disabled=""');
    expect(html).toContain('opacity-50');
  });
});
