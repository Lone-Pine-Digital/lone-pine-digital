import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { items, scheme, heading, bodyText } = attributes;

  return (
    <section {...useBlockProps.save({ className: `icons-section ${scheme}` })}>
        <div class="container">

          <RichText.Content
              class="section-heading fade-in-up"
              tagName="h2"
              value={heading} 
          />

          <RichText.Content
              class="section-body fade-in-up"
              tagName="p"
              value={bodyText} 
          />
          <div class="icons swiper-mobile">
            <div class="swiper-wrapper">
              {items.map((item, index) => (
                  <div key={index} class="icon-item swiper-slide">
                    <div class='icon-item-icon'>
                        <img src={item.icon} alt={item.title} />
                    </div>
                    <RichText.Content
                      tagName="h3"
                      class="h4 icon-item-title"
                      value={item.title}
                    />
                    <RichText.Content
                      tagName="p"
                      class="icon-item-content"
                      value={item.text}
                    />
                  </div>
              ))}
            </div>
            <div class="swiper-buttons-wrapper">
              <div class="swiper-button-prev">
                <svg class="icon" width="56" height="32" title="Previous slide">
                      <use href="/wp-content/themes/lone-pine-digital/assets/iconsprite.svg#arrowLeft"/>
                  </svg>
              </div>
              <div class="swiper-button-next">
                <svg class="icon" width="56" height="32" title="Next slide">
                  <use href="/wp-content/themes/lone-pine-digital/assets/iconsprite.svg#arrowRight"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}