(function (global) {
    'use strict';

    function createCameraIcon() {
        var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('viewBox', '0 0 24 24');
        svgElement.setAttribute('fill', 'none');
        svgElement.setAttribute('stroke', 'currentColor');
        svgElement.setAttribute('stroke-width', '2');
        svgElement.setAttribute('stroke-linecap', 'round');
        svgElement.setAttribute('stroke-linejoin', 'round');
        svgElement.setAttribute('class', 'manual-image-card__placeholder-icon');

        var pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z');
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '13');
        circle.setAttribute('r', '4');

        svgElement.appendChild(pathElement);
        svgElement.appendChild(circle);
        return svgElement;
    }

    function createSmallCameraIcon() {
        var svgElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement2.setAttribute('viewBox', '0 0 24 24');
        svgElement2.setAttribute('fill', 'none');
        svgElement2.setAttribute('stroke', 'currentColor');
        svgElement2.setAttribute('stroke-width', '2');
        svgElement2.setAttribute('stroke-linecap', 'round');
        svgElement2.setAttribute('stroke-linejoin', 'round');
        svgElement2.setAttribute('class', 'manual-image-card__tag-icon');

        var pathElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement2.setAttribute('d', 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z');
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '13');
        circle.setAttribute('r', '4');

        svgElement2.appendChild(pathElement2);
        svgElement2.appendChild(circle);
        return svgElement2;
    }

    function createImageOrPlaceholder(imageObj, sectionTitle) {
        var cardElement = document.createElement('figure');
        cardElement.className = 'manual-image-card';

        var titleText = (imageObj && imageObj.title) || (sectionTitle ? sectionTitle + ' Interface' : 'Feature View');
        var captionText = imageObj && imageObj.caption;
        var srcText = imageObj && imageObj.src;
        var altText = (imageObj && imageObj.alt) || titleText;
        var isPending = !srcText;

        var header = document.createElement('div');
        header.className = 'manual-image-card__header';

        var tagElement = document.createElement('span');
        tagElement.className = 'manual-image-card__tag';
        tagElement.appendChild(createSmallCameraIcon());

        var tagLabel = document.createElement('span');
        tagLabel.textContent = 'Screenshot: ' + titleText;
        tagElement.appendChild(tagLabel);
        header.appendChild(tagElement);

        var badge = document.createElement('span');
        badge.className = isPending
            ? 'manual-image-card__badge manual-image-card__badge--pending'
            : 'manual-image-card__badge manual-image-card__badge--live';
        badge.textContent = isPending ? 'Pending Screenshot' : 'UI Reference';
        header.appendChild(badge);

        cardElement.appendChild(header);

        var bodyElement = document.createElement('div');
        bodyElement.className = 'manual-image-card__body';

        if (!isPending) {
            var imageElement = document.createElement('img');
            imageElement.className = 'manual-image-card__img';
            imageElement.src = srcText;
            imageElement.alt = altText;
            imageElement.loading = 'lazy';
            imageElement.addEventListener('error', function () {
                bodyElement.innerHTML = '';
                bodyElement.appendChild(renderPlaceholderBox(titleText, captionText));
                badge.className = 'manual-image-card__badge manual-image-card__badge--pending';
                badge.textContent = 'Image Unavailable';
            });
            bodyElement.appendChild(imageElement);
        } else {
            bodyElement.appendChild(renderPlaceholderBox(titleText, captionText));
        }

        cardElement.appendChild(bodyElement);

        if (captionText) {
            var caption = document.createElement('figcaption');
            caption.className = 'manual-image-card__caption';
            caption.textContent = captionText;
            cardElement.appendChild(caption);
        }

        return cardElement;
    }

    function renderPlaceholderBox(title, hintText) {
        var placeholder = document.createElement('div');
        placeholder.className = 'manual-image-card__placeholder';

        var iconWrap = document.createElement('div');
        iconWrap.className = 'manual-image-card__placeholder-icon-wrap';
        iconWrap.appendChild(createCameraIcon());
        placeholder.appendChild(iconWrap);

        var titleEl = document.createElement('div');
        titleEl.className = 'manual-image-card__placeholder-title';
        titleEl.textContent = title;
        placeholder.appendChild(titleEl);

        var hintEl = document.createElement('div');
        hintEl.className = 'manual-image-card__placeholder-hint';
        hintEl.textContent = hintText || 'Screenshot placeholder will be replaced with live UI capture once asset is provided.';
        placeholder.appendChild(hintEl);

        return placeholder;
    }

    function createGalleryArrowButton(direction) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'manual-image-gallery__arrow manual-image-gallery__arrow--' + direction;
        button.setAttribute('aria-label', direction === 'previous' ? 'Previous screenshot' : 'Next screenshot');

        var svgElement3 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement3.setAttribute('viewBox', '0 0 24 24');
        svgElement3.setAttribute('fill', 'none');
        svgElement3.setAttribute('stroke', 'currentColor');
        svgElement3.setAttribute('stroke-width', '2.5');
        svgElement3.setAttribute('stroke-linecap', 'round');
        svgElement3.setAttribute('stroke-linejoin', 'round');
        svgElement3.setAttribute('aria-hidden', 'true');

        var chevron = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        chevron.setAttribute('d', direction === 'previous' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6');
        svgElement3.appendChild(chevron);
        button.appendChild(svgElement3);

        return button;
    }

    function createImageGallery(imageList, sectionTitle) {
        if (!imageList || imageList.length < 2) {
            return createImageOrPlaceholder(imageList && imageList[0], sectionTitle);
        }

        var gallery = document.createElement('div');
        gallery.className = 'manual-image-gallery';
        gallery.setAttribute('role', 'region');
        gallery.setAttribute('aria-roledescription', 'carousel');
        gallery.setAttribute('aria-label', (sectionTitle || 'Feature') + ' screenshots');
        gallery.tabIndex = 0;

        var viewport = document.createElement('div');
        viewport.className = 'manual-image-gallery__viewport';

        var slideList = imageList.map(function (imageObj) {
            var slide = createImageOrPlaceholder(imageObj, sectionTitle);
            slide.classList.add('manual-image-gallery__slide');
            viewport.appendChild(slide);
            return slide;
        });

        var previousButton = createGalleryArrowButton('previous');
        var nextButton = createGalleryArrowButton('next');
        viewport.appendChild(previousButton);
        viewport.appendChild(nextButton);
        gallery.appendChild(viewport);

        var footer = document.createElement('div');
        footer.className = 'manual-image-gallery__footer';

        var counter = document.createElement('span');
        counter.className = 'manual-image-gallery__counter';
        counter.setAttribute('aria-live', 'polite');

        var dotList = document.createElement('div');
        dotList.className = 'manual-image-gallery__dots';

        var activeIndex = 0;

        function showSlide(nextIndex) {
            activeIndex = (nextIndex + slideList.length) % slideList.length;
            slideList.forEach(function (slide, slideIndex) {
                slide.hidden = slideIndex !== activeIndex;
            });
            Array.prototype.forEach.call(dotList.children, function (dotButton, dotIndex) {
                if (dotIndex === activeIndex) {
                    dotButton.setAttribute('aria-current', 'true');
                } else {
                    dotButton.removeAttribute('aria-current');
                }
            });
            counter.textContent = (activeIndex + 1) + ' / ' + slideList.length;
        }

        slideList.forEach(function (slide, slideIndex) {
            var dotButton2 = document.createElement('button');
            dotButton2.type = 'button';
            dotButton2.className = 'manual-image-gallery__dot';
            dotButton2.setAttribute('aria-label', 'Show screenshot ' + (slideIndex + 1) + ' of ' + slideList.length);
            dotButton2.addEventListener('click', function () {
                showSlide(slideIndex);
            });
            dotList.appendChild(dotButton2);
        });

        previousButton.addEventListener('click', function () {
            showSlide(activeIndex - 1);
        });
        nextButton.addEventListener('click', function () {
            showSlide(activeIndex + 1);
        });
        gallery.addEventListener('keydown', function (keyEvent) {
            if (keyEvent.key === 'ArrowLeft') {
                showSlide(activeIndex - 1);
            } else if (keyEvent.key === 'ArrowRight') {
                showSlide(activeIndex + 1);
            }
        });

        footer.appendChild(dotList);
        footer.appendChild(counter);
        gallery.appendChild(footer);
        showSlide(0);

        return gallery;
    }

    global.GoPickImageRenderer = {
        createImageOrPlaceholder: createImageOrPlaceholder,
        createImageGallery: createImageGallery
    };
})(window);
