import React, { useEffect, useId, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import mermaid from 'mermaid';
import { SupportedLanguage } from '../types/docs';
import { UI_CONTROLS, pickText } from '../data/locales';

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
  theme?: 'dark' | 'light';
  currentLang?: SupportedLanguage;
}

let renderQueue: Promise<void> = Promise.resolve();

function buildMermaidThemeVars(theme: 'dark' | 'light'): Record<string, string> {
  if (theme === 'dark') {
    return {
      darkMode: 'true',
      background: '#17191C',
      primaryColor: '#1E2126',
      primaryTextColor: '#ECECE8',
      primaryBorderColor: '#6FAF8F',
      secondaryColor: '#1F242B',
      secondaryTextColor: '#D6D8DC',
      secondaryBorderColor: '#7EA3C4',
      tertiaryColor: '#222429',
      tertiaryTextColor: '#D6D8DC',
      lineColor: '#7E828A',
      textColor: '#ECECE8',
      edgeLabelBackground: '#1E2126',
      actorBkg: '#1E2126',
      actorBorder: '#6FAF8F',
      actorTextColor: '#ECECE8',
      actorLineColor: '#4A4E58',
      signalColor: '#B4B7BD',
      signalTextColor: '#ECECE8',
      labelBoxBkgColor: '#1E2126',
      labelBoxBorderColor: '#7EA3C4',
      labelTextColor: '#ECECE8',
      noteBkgColor: '#22201B',
      noteBorderColor: '#C9A96E',
      noteTextColor: '#ECECE8',
      fontSize: '12.5px',
      fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
    };
  }
  return {
    darkMode: 'false',
    background: '#FFFFFF',
    primaryColor: '#F3F1EC',
    primaryTextColor: '#18181B',
    primaryBorderColor: '#1B4332',
    secondaryColor: '#F7F8FA',
    secondaryTextColor: '#18181B',
    secondaryBorderColor: '#2C3E50',
    tertiaryColor: '#FAF9F6',
    tertiaryTextColor: '#18181B',
    lineColor: '#52525B',
    textColor: '#18181B',
    edgeLabelBackground: '#F3F1EC',
    actorBkg: '#F3F1EC',
    actorBorder: '#1B4332',
    actorTextColor: '#18181B',
    actorLineColor: '#716E68',
    signalColor: '#2C3E50',
    signalTextColor: '#18181B',
    labelBoxBkgColor: '#FAF9F6',
    labelBoxBorderColor: '#2C3E50',
    labelTextColor: '#18181B',
    noteBkgColor: '#FBF7EE',
    noteBorderColor: '#8C6D32',
    noteTextColor: '#18181B',
    fontSize: '12.5px',
    fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
  };
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  chart,
  caption,
  theme = 'dark',
  currentLang = 'en',
}) => {
  const reactId = useId().replace(/:/g, '');
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const [renderFailed, setRenderFailed] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const mountedRef = useRef(true);
  const isSequence = chart.trim().startsWith('sequenceDiagram');

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!zoomed) {
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomed(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [zoomed]);

  useEffect(() => {
    let active = true;
    const renderId = `mermaid-${reactId}-${theme}-${Math.random().toString(36).slice(2, 7)}`;

    const runRender = async () => {
      if (!active || !mountedRef.current) {
        return;
      }
      try {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          themeVariables: buildMermaidThemeVars(theme),
          fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
          flowchart: {
            htmlLabels: false,
            useMaxWidth: true,
            curve: 'basis',
            padding: 20,
            nodeSpacing: 34,
            rankSpacing: 44,
          },
          sequence: {
            useMaxWidth: false,
            actorMargin: 48,
            messageMargin: 36,
            boxMargin: 12,
          },
        });
        const { svg } = await mermaid.render(renderId, chart);
        if (active && mountedRef.current) {
          setSvgMarkup(svg);
          setRenderFailed(false);
        }
      } catch {
        const orphan = document.getElementById(`d${renderId}`);
        if (orphan) {
          orphan.remove();
        }
        if (active && mountedRef.current) {
          setRenderFailed(true);
        }
      }
    };

    renderQueue = renderQueue.then(runRender, runRender);

    return () => {
      active = false;
    };
  }, [chart, theme, reactId]);

  return (
    <>
      <div className="mermaid-card">
        <div className="mermaid-card-header">
          {caption ? <div className="mermaid-caption">{caption}</div> : <span />}
          {svgMarkup && !renderFailed && (
            <button
              type="button"
              className="mermaid-zoom-btn"
              onClick={() => setZoomed(true)}
              aria-label={pickText(UI_CONTROLS.zoomDiagramLabel, currentLang)}
              title={pickText(UI_CONTROLS.zoomDiagramLabel, currentLang)}
            >
              <Maximize2 size={13} />
            </button>
          )}
        </div>
        {renderFailed ? (
          <pre style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', overflowX: 'auto' }}>
            {chart}
          </pre>
        ) : !svgMarkup ? (
          <div className="mermaid-skeleton" aria-hidden="true" />
        ) : (
          <div
            className={`mermaid-svg-wrap ${isSequence ? 'mermaid-sequence' : ''}`}
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        )}
      </div>

      {zoomed && svgMarkup && (
        <div
          className="mermaid-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={caption ?? pickText(UI_CONTROLS.zoomDiagramLabel, currentLang)}
          onClick={() => setZoomed(false)}
        >
          <div className="mermaid-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="mermaid-lightbox-bar">
              <span className="mermaid-caption" style={{ marginBottom: 0 }}>
                {caption}
              </span>
              <button
                type="button"
                className="nav-icon-btn"
                onClick={() => setZoomed(false)}
                aria-label={pickText(UI_CONTROLS.closeZoomLabel, currentLang)}
              >
                <X size={16} />
              </button>
            </div>
            <div
              className="mermaid-lightbox-body"
              dangerouslySetInnerHTML={{ __html: svgMarkup }}
            />
          </div>
        </div>
      )}
    </>
  );
};
