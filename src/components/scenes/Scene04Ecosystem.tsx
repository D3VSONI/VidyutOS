import React, { useState } from 'react';
import { ArrowRight, Info, CheckCircle2, Share2, Layers } from 'lucide-react';
import { ECOSYSTEM_NODES } from '../../lib/demoData';
import { EcosystemNode } from '../../lib/types';

interface Scene04EcosystemProps {
  onNext: () => void;
  onSelectCatchMeUp: () => void;
}

export const Scene04Ecosystem: React.FC<Scene04EcosystemProps> = ({ onNext, onSelectCatchMeUp }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('catchmeup');

  const selectedNode = ECOSYSTEM_NODES.find((n) => n.id === selectedNodeId) || ECOSYSTEM_NODES[3];

  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-8 lg:py-14 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">04</span>
        <span>·</span>
        <span>System Architecture</span>
        <span>·</span>
        <span>The Unified School Ecosystem</span>
      </div>

      <div className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Every module feeds the student journey.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed">
            Click on any module to trace its real-time relationships across the portal. When an event occurs in one domain—such as an excused absence—it ripples intelligently through schedules, study recaps, and peer collaboration.
          </p>
        </div>

        {/* Interactive Ecosystem Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Node Selection Grid & Visual Relationship Graph */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-semibold text-stone-500 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> INTERACTIVE SYSTEM TOPOLOGY
              </span>
              <span className="text-xs text-stone-400">Select a node to inspect linkages</span>
            </div>

            {/* Grid of interactive ecosystem modules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ECOSYSTEM_NODES.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isConnected = selectedNode.connectedTo.includes(node.id);

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/90 text-stone-900 shadow-md ring-2 ring-blue-500/20'
                        : isConnected
                        ? 'border-blue-200 bg-blue-50/30 text-stone-800 hover:border-blue-300'
                        : 'border-stone-200 bg-stone-50/60 hover:bg-white text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono text-[10px] uppercase font-bold text-blue-700">
                        {node.category}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                      )}
                      {isConnected && !isSelected && (
                        <span className="text-[10px] text-blue-600 font-mono font-medium">Linked</span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-stone-900 leading-snug">{node.label}</h4>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {node.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Visual connector hint */}
            <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Active Node
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-200 inline-block" /> Directly Connected
                </span>
              </div>
              <span className="font-mono text-[11px] text-stone-400">9 Connected Core & AI Modules</span>
            </div>
          </div>

          {/* Right: Detailed Node Inspection Card */}
          <div className="lg:col-span-4 bg-stone-900 text-stone-100 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider font-semibold">
                MODULE INSPECTION
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono">
                {selectedNode.category}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{selectedNode.label}</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
              <span className="text-[10px] font-mono text-stone-400 block mb-1">OPERATIONAL METRIC</span>
              <p className="text-xs font-semibold text-white">{selectedNode.metrics}</p>
            </div>

            <div>
              <span className="text-[10px] font-mono text-stone-400 block mb-2">
                ACTIVE DATA RELATIONSHIPS ({selectedNode.connectedTo.length})
              </span>
              <div className="space-y-1.5">
                {selectedNode.connectedTo.map((targetId) => {
                  const targetNode = ECOSYSTEM_NODES.find((n) => n.id === targetId);
                  return (
                    <div
                      key={targetId}
                      className="text-xs text-stone-300 flex items-center justify-between p-2 rounded-lg bg-stone-800/50"
                    >
                      <span className="font-medium">{targetNode?.label || targetId}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedNode.id === 'catchmeup' ? (
              <button
                onClick={onSelectCatchMeUp}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-md text-center"
              >
                Launch Catch Me Up Experience →
              </button>
            ) : (
              <button
                onClick={() => setSelectedNodeId('catchmeup')}
                className="w-full py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center"
              >
                Inspect Centerpiece: Catch Me Up →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="border-t border-stone-200/80 pt-6 mt-8 flex items-center justify-between">
        <span className="text-xs text-stone-500">Scene 04 of 12</span>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-stone-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Next: Introduce Flagship — Catch Me Up</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
