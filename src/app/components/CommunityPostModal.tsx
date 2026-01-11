import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Image, BarChart3, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface CommunityPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (post: { type: "message" | "poll"; content: string; pollOptions?: string[] }) => void;
}

export function CommunityPostModal({ isOpen, onClose, onPost }: CommunityPostModalProps) {
  const [activeTab, setActiveTab] = useState<"message" | "poll">("message");
  const [messageContent, setMessageContent] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handleRemovePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handlePost = () => {
    if (activeTab === "message" && messageContent.trim()) {
      onPost({ type: "message", content: messageContent });
      setMessageContent("");
      onClose();
    } else if (activeTab === "poll" && pollQuestion.trim() && pollOptions.every(opt => opt.trim())) {
      onPost({ type: "poll", content: pollQuestion, pollOptions: pollOptions.filter(opt => opt.trim()) });
      setPollQuestion("");
      setPollOptions(["", ""]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-gray-100 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold">Share with Community</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "message" | "poll")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="message" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Message
                </TabsTrigger>
                <TabsTrigger value="poll" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Poll
                </TabsTrigger>
              </TabsList>

              <TabsContent value="message" className="space-y-4">
                <div className="space-y-2">
                  <Label>What's on your mind?</Label>
                  <Textarea
                    placeholder="Share updates, announcements, or tips with your placement community..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="min-h-[200px] resize-none bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>
              </TabsContent>

              <TabsContent value="poll" className="space-y-4">
                <div className="space-y-2">
                  <Label>Poll Question</Label>
                  <Input
                    placeholder="e.g., Which skill should we focus on for placements?"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Poll Options</Label>
                    {pollOptions.length < 5 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleAddPollOption}
                        className="h-8 text-sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Option
                      </Button>
                    )}
                  </div>
                  
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handlePollOptionChange(index, e.target.value)}
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                      {pollOptions.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemovePollOption(index)}
                          className="h-12 w-12 flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 border-gray-200 hover:border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePost}
              disabled={
                (activeTab === "message" && !messageContent.trim()) ||
                (activeTab === "poll" && (!pollQuestion.trim() || !pollOptions.every(opt => opt.trim())))
              }
              className="bg-gradient-to-r from-[#DFFF6C] to-[#c9ea4f] hover:from-[#c9ea4f] hover:to-[#DFFF6C] text-black font-semibold shadow-lg"
            >
              Post to Community
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
