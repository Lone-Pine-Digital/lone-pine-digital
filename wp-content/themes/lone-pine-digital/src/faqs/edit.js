import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { faqs, heading, scheme } = attributes;

  const blockProps = useBlockProps({
    className: `faqs ${scheme}`
  });

  const updateFAQ = (index, field, value) => {
    const newFAQs = [...faqs];
    newFAQs[index][field] = value;
    setAttributes({ faqs: newFAQs });
  };

  const addFAQ = () => {
    setAttributes({ faqs: [...faqs, { question: '', answer: '' }] });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title="FAQs Scheme" initialOpen={true}>
          <SelectControl
            label="Color Scheme"
            value={scheme}
            options={[
              { label: 'Eggshell', value: 'eggshell' },
              { label: 'Evergreen', value: 'evergreen' },
              { label: 'Celadon', value: 'celadon' }
            ]}
            onChange={(value) => setAttributes({ scheme: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <RichText
          tagName="h2"
          value={heading}
          onChange={(value) => setAttributes({ heading: value })}
          placeholder="Add section heading…"
        />

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq">
              <RichText
                tagName="h3"
                value={faq.question}
                onChange={(value) => updateFAQ(index, 'question', value)}
                placeholder="FAQ Question…"
              />
              <RichText
                tagName="p"
                className="faq-answer"
                value={faq.answer}
                onChange={(value) => updateFAQ(index, 'answer', value)}
                placeholder="FAQ Answer…"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="components-button is-primary"
          onClick={addFAQ}
        >
          Add FAQ
        </button>
      </div>
    </>
  );
}