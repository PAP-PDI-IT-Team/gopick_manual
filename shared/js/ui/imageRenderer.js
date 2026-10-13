(function (global) {
    'use strict';

    function createCameraIcon() {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('class', 'w-6 h-6');

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z');
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '13');
        circle.setAttribute('r', '4');

        svg.appendChild(path);
        svg.appendChild(circle);
        return svg;
    }

    function createSmallCameraIcon() {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('class', 'manual-image-card__tag-icon');

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z');
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '12');
        circle.setAttribute('cy', '13');
        circle.setAttribute('r', '4');

        svg.appendChild(path);
        svg.appendChild(circle);
        return svg;
    }

    function createImageOrPlaceholder(imageObj, sectionTitle) {
        var card = document.createElement('figure');
        card.className = 'manual-image-card';

        var titleText = (imageObj && imageObj.title) || (sectionTitle ? sectionTitle + ' Interface' : 'Feature View');
        var captionText = imageObj && imageObj.caption;
        var srcText = imageObj && imageObj.src;
        var altText = (imageObj && imageObj.alt) || titleText;
        var isPending = !srcText;

        var header = document.createElement('div');
        header.className = 'manual-image-card__header';

        var tag = document.createElement('span');
        tag.className = 'manual-image-card__tag';
        tag.appendChild(createSmallCameraIcon());

        var tagLabel = document.createElement('span');
        tagLabel.textContent = 'Screenshot: ' + titleText;
        tag.appendChild(tagLabel);
        header.appendChild(tag);

        var badge = document.createElement('span');
        badge.className = isPending
            ? 'manual-image-card__badge manual-image-card__badge--pending'
            : 'manual-image-card__badge manual-image-card__badge--live';
        badge.textContent = isPending ? 'Pending Screenshot' : 'UI Reference';
        header.appendChild(badge);

        card.appendChild(header);

        var body = document.createElement('div');
        body.className = 'manual-image-card__body';

        if (!isPending) {
            var img = document.createElement('img');
            img.className = 'manual-image-card__img';
            img.src = srcText;
            img.alt = altText;
            img.loading = 'lazy';
            img.addEventListener('error', function () {
                body.innerHTML = '';
                body.appendChild(renderPlaceholderBox(titleText, captionText));
                badge.className = 'manual-image-card__badge manual-image-card__badge--pending';
                badge.textContent = 'Image Unavailable';
            });
            body.appendChild(img);
        } else {
            body.appendChild(renderPlaceholderBox(titleText, captionText));
        }

        card.appendChild(body);

        if (captionText) {
            var caption = document.createElement('figcaption');
            caption.className = 'manual-image-card__caption';
            caption.textContent = captionText;
            card.appendChild(caption);
        }

        return card;
    }

    function renderPlaceholderBox(title, hint) {
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
        hintEl.textContent = hint || 'Screenshot placeholder will be replaced with live UI capture once asset is provided.';
        placeholder.appendChild(hintEl);

        return placeholder;
    }

    global.GoPickImageRenderer = {
        createImageOrPlaceholder: createImageOrPlaceholder
    };
})(window);
