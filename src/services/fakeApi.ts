import { 
  mockChaseUps, 
  mockExceptions, 
  mockProcessingItems, 
  mockSearchResults, 
  mockPipelineMetrics,
  type ChaseUp,
  type Exception,
  type ProcessingItem,
  type SearchResult,
  type PipelineMetrics
} from '../data/mockData';

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const fakeApi = {
  // Chase-ups endpoints
  async getChaseUps(status?: string): Promise<ChaseUp[]> {
    await delay();
    if (!status || status === 'all') {
      return mockChaseUps;
    }
    return mockChaseUps.filter(item => item.status === status);
  },

  async getChaseUpById(id: string): Promise<ChaseUp | null> {
    await delay();
    return mockChaseUps.find(item => item.id === id) || null;
  },

  // Exceptions endpoints
  async getExceptions(status?: string): Promise<Exception[]> {
    await delay();
    if (!status || status === 'all') {
      return mockExceptions;
    }
    return mockExceptions.filter(item => item.status === status);
  },

  async getExceptionById(id: string): Promise<Exception | null> {
    await delay();
    return mockExceptions.find(item => item.id === id) || null;
  },

  // Processing queue endpoints
  async getProcessingItems(): Promise<ProcessingItem[]> {
    await delay();
    return mockProcessingItems;
  },

  async getProcessingItemById(id: string): Promise<ProcessingItem | null> {
    await delay();
    return mockProcessingItems.find(item => item.id === id) || null;
  },

  // Knowledge search endpoints
  async searchKnowledge(query?: string): Promise<SearchResult[]> {
    await delay();
    if (!query) {
      return mockSearchResults;
    }
    // Simple search simulation
    return mockSearchResults.filter(result => 
      result.answer.toLowerCase().includes(query.toLowerCase()) ||
      result.question.toLowerCase().includes(query.toLowerCase())
    );
  },

  // Pipeline metrics endpoint
  async getPipelineMetrics(): Promise<PipelineMetrics> {
    await delay();
    return mockPipelineMetrics;
  },

  // Dashboard summary endpoint
  async getDashboardSummary() {
    await delay();
    const urgentExceptions = mockExceptions.filter(e => e.status === 'urgent' || e.status === 'warning');
    const awaitingChaseUps = mockChaseUps.filter(c => c.status === 'awaiting');
    const repliedChaseUps = mockChaseUps.filter(c => c.status === 'replied');
    
    return {
      urgentExceptions,
      chaseUpStats: {
        total: mockChaseUps.length,
        awaiting: awaitingChaseUps.length,
        replied: repliedChaseUps.length
      },
      pipelineStats: {
        total: mockPipelineMetrics.totalMails,
        poUpdates: mockPipelineMetrics.breakdown.po,
        costSheets: mockPipelineMetrics.breakdown.costSheet,
        noise: mockPipelineMetrics.breakdown.noise
      },
      processingTime: "4.2m"
    };
  }
};
