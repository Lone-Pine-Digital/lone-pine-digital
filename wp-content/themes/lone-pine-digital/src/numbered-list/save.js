import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { items, scheme, heading, bodyText } = attributes;

  return (
    <section {...useBlockProps.save({ className: `numbered-list ${scheme}` })}>
        <div className="container">

            <RichText.Content
                className="section-heading fade-in-up"
                tagName="h2"
                value={heading} 
            />

            <RichText.Content
                className="section-body fade-in-up"
                tagName="p"
                value={bodyText} 
            />
            <div className="list">
              {items.map((item, index) => (
                  <div key={index} className="list-item">
                    <span className="h2 list-item-number fade-in-up">{index + 1}</span>
                    <RichText.Content
                      tagName="h3"
                      className="h4 list-item-title fade-in-up"
                      value={item.title}
                    />
                    <RichText.Content
                      tagName="p"
                      className="list-item-content fade-in-up"
                      value={item.text}
                    />
                  </div>
              ))}
            </div>
        </div>
    </section>
  );
}