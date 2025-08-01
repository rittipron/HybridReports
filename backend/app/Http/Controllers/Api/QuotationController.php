<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quotation;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class QuotationController extends Controller
{

    /**
     * Display a listing of the quotations.
     */
    public function index()
    {
        return Quotation::with(['customer', 'items.product'])->get();
    }

    /**
     * Store a newly created quotation in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'quotation_date' => 'required|date',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);



        DB::beginTransaction();
        try {
            $quotation = Quotation::create([
                'quotation_number' => 'Q' . time(),
                'customer_id' => $request->customer_id,
                'quotation_date' => $request->quotation_date,
                'notes' => $request->notes,
                'total' => 0,
            ]);

            $total = 0;
            foreach ($request->items as $item) {
                $subtotal = $item['quantity'] * $item['price'];
                $quotation->items()->create([
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'subtotal' => $subtotal,
                ]);
                $total += $subtotal;
            }

            $quotation->update(['total' => $total]);
            DB::commit();

            return response()->json($quotation->load(['customer', 'items.product']), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Create failed', 'message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $quotation = Quotation::with(['customer', 'items.product'])->findOrFail($id);
        return $quotation;
    }

    // Export PDF
    public function exportPdf($id)
    {
        $quotation = Quotation::with(['customer', 'items.product'])->findOrFail($id);
        $pdf = Pdf::loadView('pdf.quotation', compact('quotation'));
        return $pdf->stream("quotation_{$quotation->quotation_number}.pdf");
    }
}
