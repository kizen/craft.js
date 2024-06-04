import { RenderIndicator, getDOMInfo } from '@craftjs/utils';
import React, { useEffect, useRef, useState } from 'react';

import { useEventHandler } from './EventContext';
import movePlaceholder from './movePlaceholder';

import { useInternalEditor } from '../editor/useInternalEditor';

export const RenderEditorIndicator = ({ show = true }) => {
  const firstRender = useRef(true);
  const [, rerender] = useState(null);
  const { indicator, indicatorOptions, enabled } = useInternalEditor(
    (state) => ({
      indicator: state.indicator,
      indicatorOptions: state.options.indicator,
      enabled: state.options.enabled,
    })
  );

  const handler = useEventHandler();

  useEffect(() => {
    if (!handler) {
      return;
    }

    if (!enabled) {
      handler.disable();
      return;
    }

    handler.enable();
  }, [enabled, handler]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      rerender(Date.now());
    }
  }, [show]);

  if (!show || !indicator) {
    return null;
  }

  return React.createElement(RenderIndicator, {
    style: {
      ...movePlaceholder(
        indicator.placement,
        getDOMInfo(indicator.placement.parent.dom),
        indicator.placement.currentNode &&
          getDOMInfo(indicator.placement.currentNode.dom),
        indicatorOptions.thickness
      ),
      backgroundColor: indicator.error
        ? indicatorOptions.error
        : indicatorOptions.success,
      transition: indicatorOptions.transition || '0.2s ease-in',
    },
    parentDom: indicator.placement.parent.dom,
  });
};
