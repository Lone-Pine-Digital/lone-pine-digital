import { useEffect, useState } from '@wordpress/element';
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { formId, heading, scheme, text } = attributes;
  
  const blockProps = useBlockProps({
    className: `contact-form ${scheme}`
  });

  const [forms, setForms] = useState([]);

useEffect(() => {
    if (window.CJSFormsData && window.CJSFormsData.forms) {
        const options = window.CJSFormsData.forms.map((form) => ({
            label: form.title,
            value: form.id,
        }));
        setForms(options);
    }
}, []);

  return (
    <>
      <InspectorControls>
        <PanelBody title="Contact Form Scheme" initialOpen={true}>
          <SelectControl
              label="Colour Scheme"
              value={scheme}
              options={[
                  { label: 'White', value: 'white' },
                  { label: 'Dark', value: 'dark' },
                  { label: 'Blue', value: 'blue' }
              ]}
              onChange={(value) => setAttributes({ scheme: value })}
          />
        </PanelBody>

        <PanelBody title="WPForms Settings">
          <SelectControl
            label="Select a Form"
            value={formId}
            options={[
              { label: 'Select a form…', value: 0 },
              ...forms
            ]}
            onChange={(value) => setAttributes({ formId: parseInt(value) })}
          />
        </PanelBody>

      </InspectorControls>

      <RichText
        tagName="h2"
        value={heading}
        onChange={(value) => setAttributes({ heading: value })}
        placeholder="Add section heading…"
    />

    <RichText
        tagName="p"
        value={text}
        onChange={(value) => setAttributes({ text: value })}
        placeholder="Add section body text…"
    />

      <div {...blockProps}>
        {formId
          ? <p>WPForms form selected: {formId}</p>
          : <p>No form selected.</p>
        }
      </div>
    </>
  );
}