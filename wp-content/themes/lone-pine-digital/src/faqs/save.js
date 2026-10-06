import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { faqs, scheme, heading } = attributes;

  return (
    <section {...useBlockProps.save({ className: `faqs ${scheme}` })}>
      <div className="container">

        <RichText.Content
          className="section-heading fade-in-up"
          tagName="h2"
          value={heading}
        />

        <div className="faq-list fade-in-up">
          {faqs.map((faq, index) => (
            <div key={index} className="faq">
              <button className="faq-question">
                <RichText.Content
                  tagName="h3"
                  value={faq.question}
                />
                <svg class="icon" width="24" height="24">
                  <use href="/wp-content/themes/lone-pine-digital/assets/iconsprite.svg#chevron"/>
                </svg>
              </button>

              <RichText.Content
                tagName="p"
                className="faq-answer"
                value={faq.answer}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}