import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { items, scheme, heading, bodyText } = attributes;

  return (
    <section {...useBlockProps.save({ className: `testimonials-section ${scheme}` })}>
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
          <div class="testimonials swiper swiper-testimonials fade-in-up">
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
            <div class="swiper-wrapper">
              {items.map((item, index) => (
                  <div key={index} class="testimonial-item swiper-slide">
                    <div class='testimonial-item-icon'>
                        <img src={item.icon} alt={item.title} loading="eager" />
                    </div>
                    <RichText.Content
                      tagName="h3"
                      class="h4 testimonial-item-title"
                      value={item.title}
                    />
                    <RichText.Content
                      tagName="p"
                      class="testimonial-item-content"
                      value={item.text}
                    />
                  </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}